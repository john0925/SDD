using Backend.Services;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<MealDataService>();

// Enable CORS for the Vue frontend
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Vite default port
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection(); // Disable for local HTTP testing
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

app.Run();
