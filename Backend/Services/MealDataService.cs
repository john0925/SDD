using System.Text.Json;
using Backend.Models;

namespace Backend.Services;

public class MealDataService
{
    private readonly string _filePath;
    private readonly JsonSerializerOptions _options;

    public MealDataService(IWebHostEnvironment env)
    {
        _filePath = Path.Combine(env.ContentRootPath, "App_Data", "meals.json");
        _options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
    }

    public async Task<IEnumerable<Meal>> GetMealsAsync()
    {
        if (!File.Exists(_filePath))
        {
            return Enumerable.Empty<Meal>();
        }

        using var stream = File.OpenRead(_filePath);
        var meals = await JsonSerializer.DeserializeAsync<IEnumerable<Meal>>(stream, _options);
        return meals ?? Enumerable.Empty<Meal>();
    }
}
