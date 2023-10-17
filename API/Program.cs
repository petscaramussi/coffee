using Application;
using Infrastructure;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddApplication()
    .AddInfrastructure();
builder.Services.AddControllers();

builder.Services.AddDbContext<StoreContext>(opt => 
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();

using var scope = app.Services.CreateScope();
var service = scope.ServiceProvider;
var context = service.GetRequiredService<StoreContext>();
var logger = service.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();
}
catch (System.Exception ex)
{
    logger.LogError(ex, "An error ocurred during migration");
}
app.Run();
