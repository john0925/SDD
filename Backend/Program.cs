using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<MealDataService>();

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.MapGet("/api/meals", async ([FromServices] MealDataService mealService, [FromQuery] string? category) =>
{
    var meals = await mealService.GetMealsAsync();
    
    if (!string.IsNullOrEmpty(category) && category.ToLower() != "all")
    {
        meals = meals.Where(m => m.CarbCategory.Equals(category, StringComparison.OrdinalIgnoreCase));
    }
    
    return Results.Ok(meals);
})
.WithName("GetMeals")
.WithOpenApi();

app.MapPost("/api/orders", ([FromBody] OrderRequest request) =>
{
    // Log the request to see if it arrives
    Console.WriteLine($"Order received with {request.Items?.Count ?? 0} items. Pickup at: {request.PickupTime}");
    
    var orderId = $"DH-{DateTime.Now:yyyyMMdd}{new Random().Next(10, 99)}";
    return Results.Ok(new { orderId });
})
.WithName("CreateOrder")
.WithOpenApi();

app.Run();
