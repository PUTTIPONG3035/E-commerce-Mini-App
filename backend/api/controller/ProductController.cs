using Microsoft.AspNetCore.Builder;
using Microsoft.Data.SqlClient;
using Dapper;

public static class ProductEndpoints
{
    public static void ProductController(this WebApplication app, string connectionString)
    {
        app.MapGet("/product", async (HttpContext context) =>
        {
        //     var middleware = new TokenAuthenticationMiddleware(async (ctx) => { });
        //     await middleware.InvokeAsync(context); // ใช้ InvokeAsync
        //    if (context.Response.StatusCode == StatusCodes.Status401Unauthorized)
        //      {
        //          return Results.Unauthorized();
        //     }
            using var connection = new SqlConnection(connectionString);
            var result = await connection.QueryAsync<Product>("SELECT * FROM Product");
            return Results.Ok(result);
        })
        .WithName("GetProductData")
        .WithOpenApi();

        app.MapGet("/product/{id}", async (int id) =>{
            using var connection = new SqlConnection(connectionString);
            var result = await connection.QueryFirstAsync<Product>($"SELECT * FROM Product WHERE ProductId = {id}");
            return Results.Ok(result);
        })
        .WithName("GetProductById")
        .WithOpenApi();
        
       app.MapPost("/product", async (Product product, HttpContext context) =>{
         using var connection = new SqlConnection(connectionString);
         await connection.ExecuteAsync("INSERT INTO Product (ProductName, Price, Rating, ProductImage, Date) VALUES (@ProductName, @Price, @Rating, @ProductImage, @Date)", product);
         return Results.Created($"/product/{product.ProductId}", product);
       })
       .WithName("CreateProduct")
       .WithOpenApi();

    }
}
