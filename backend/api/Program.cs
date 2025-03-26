using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("qwertyuiopasdfghjklzxcvbnm1234567890qwertyui")),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseAuthorization();

app.UseCors("AllowAngularApp");

app.UseHttpsRedirection();
 
app.ProductController(connectionString);
app.UserController (connectionString);


app.Run();



