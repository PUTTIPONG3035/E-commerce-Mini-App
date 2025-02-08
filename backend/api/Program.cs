using Microsoft.Data.SqlClient;
using Dapper;

var builder = WebApplication.CreateBuilder(args);

// อ่านค่า Connection String จาก appsettings.json
string connectionString = "Server=localhost,1433;Database=Diamond;User Id=sa;Password=123ewQ76; TrustServerCertificate=True;";

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        builder => builder.WithOrigins("http://localhost:4200") // Angular รันที่พอร์ตนี้
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .SetIsOriginAllowedToAllowWildcardSubdomains());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngularApp");

app.UseHttpsRedirection();
 

app.ProductController(connectionString);


app.Run();



