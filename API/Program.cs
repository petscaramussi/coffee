using API.Profiles;
using AutoMapper;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
    });
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddScoped<IProductRepository, ProductRepository>();

MapperConfiguration mapperConfiguration = new MapperConfiguration(cfg =>
{
    Action<IMapperConfigurationExpression> config = _ => { };

    config(cfg);

    IEnumerable<Assembly> assembliesToScan = AppDomain.CurrentDomain.GetAssemblies();

    TypeInfo[] allTypes = assembliesToScan.Where(a => a.GetName().Name != nameof(AutoMapper))
                                          .SelectMany(a => a.DefinedTypes)
                                          .ToArray();

    TypeInfo profileTypeInfo = typeof(Profile).GetTypeInfo();
    TypeInfo[] profiles = allTypes.Where(t => profileTypeInfo.IsAssignableFrom(t) && !t.IsAbstract).ToArray();

    foreach (Type profile in profiles.Select(t => t.AsType()))
    {
        cfg.AddProfile(profile);
    }
});
IMapper mapper = mapperConfiguration.CreateMapper();
builder.Services.AddSingleton(mapper);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<StoreContext>();
var logger = services.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();
}
catch (Exception ex)
{
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();