using System.Net;
using System.Web.Http;
using Azure.Core;
using Dapper;
using Microsoft.Data.SqlClient;

public static class UserEndpoints
{
    public static void UserController(this WebApplication app, string connectionString)
    {
        app.MapGet("/user", async () =>
       {
           using var connection = new SqlConnection(connectionString);
           var result = await connection.QueryAsync<User>("SELECT * FROM Users");
           return Results.Ok(result);
       })
       .WithName("GetUserData")
       .WithOpenApi();

        app.MapPost("/signup", async ([FromBody] User user) =>
        {
            using var connection = new SqlConnection(connectionString);
            try
            {
                User userObj = connection.QueryFirstOrDefault<User>("SELECT * FROM Users WHERE Email = @Email", new { Email = user.email });
                if (userObj == null)
                {
                    user.role = "user";
                    user.status = "false";
                    await connection.ExecuteAsync("INSERT INTO Users (Name, ContactNumber, Email, Password, Role, Status) VALUES (@Name, @ContactNumber, @Email, @Password, @Role, @Status)", user);
                    return Results.Created($"/user/{user.id}", user);
                }
                else
                {
                    return Results.BadRequest("Email already exists!");
                }
            }
            catch (Exception ex)
            {
                return Results.Problem($"Error: {ex.Message}");
            }
        })
        .WithName("CreateUser")
        .WithOpenApi();

        app.MapPost("/login", async ([FromBody] User user) =>
        {
            try
            {
                using var connection = new SqlConnection(connectionString);
                User userObj = connection.QueryFirstOrDefault<User>("SELECT * FROM Users WHERE Email = @Email AND Password = @Password", new { Email = user.email, Password = user.password });
                if (userObj != null)
                {
                    if (userObj.status == "true")
                    {
                        return Results.Ok(new { token = TokenManager.GenerateToken(userObj.email, userObj.role) });
                    }
                    else
                    {
                        return Results.Problem("Wait for Admin Approval", statusCode: (int)HttpStatusCode.Unauthorized);
                    }
                }
                else
                {
                    return Results.Problem("Incorrect Username or Password", statusCode: (int)HttpStatusCode.Unauthorized);

                }
            }
            catch (Exception ex)
            {
                return Results.Problem($"Error: {ex.Message}");
            }
        })
        .WithName("Login")
        .WithOpenApi();

        // app.UseMiddleware<TokenAuthenticationMiddleware>();
        app.MapGet("/checkToken", async (HttpContext context) =>
        {
            var middleware = new TokenAuthenticationMiddleware(async (ctx) => { });
            await middleware.InvokeAsync(context); // ใช้ InvokeAsync

            if (context.Response.StatusCode == StatusCodes.Status401Unauthorized)
             {
                 return Results.Unauthorized();
            }

            return Results.Ok(new { message = "true" });
        })
        .WithName("CheckToken")
        .WithOpenApi();
    }
}


//         app.MapGet("checkToken", async (HttpContext context) =>
// {
//     // ใช้ Middleware เฉพาะใน Route นี้
//     await new TokenAuthenticationMiddleware(async (innerContext) =>
//     {
//         await innerContext.Response.WriteAsync("Token Validated");
//     }).InvokeAsync(context);  // เรียก Middleware เพื่อตรวจสอบ Token

//     // เมื่อผ่านการตรวจสอบ Token แล้ว
//     return Results.Ok(new { message = "true" });
// })
// .WithName("CheckToken")
// .WithOpenApi();

//     }
// }