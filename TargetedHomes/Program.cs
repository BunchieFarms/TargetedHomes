using GoogleApi.Extensions;
using Microsoft.AspNetCore.HttpOverrides;
using TargetedHomes.Business;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddScoped<GoogleMapsApiBusiness>();
builder.Services.AddScoped<TargetBusiness>();

string corsOrigin = "http://th.bryceohmer.com";
#if DEBUG
    corsOrigin = "http://localhost:4200";
#endif

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins(corsOrigin)
                                .AllowAnyHeader()
                                .AllowAnyMethod(); ;
                      });
});

builder.Services
    .AddGoogleApiClients();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
