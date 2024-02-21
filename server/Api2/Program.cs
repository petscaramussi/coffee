using AutoMapper;
using Core.Interfaces.Repositories;
using Core.Services;
using Core.Validators;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Text.Json.Serialization;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

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
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IProductService, ProductService>();

builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<ProductValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<OrderValidator>();

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

WebApplication app = builder.Build();

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

app.Run();