namespace Backend.Models;

public record Nutrition(int Protein, int Carbs, int Fat);

public record MealAttributes(bool IsNonRefinedStarch, bool HasDiverseVeg);

public record Meal(
    string Id,
    string Name,
    string Description,
    string ImageUrl,
    string ImageAlt,
    string CarbCategory,
    int Calories,
    Nutrition Nutrition,
    decimal Price,
    MealAttributes? Attributes
);
