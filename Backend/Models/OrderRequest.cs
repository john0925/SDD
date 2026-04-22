namespace Backend.Models;

public record OrderItem(string MealId, int Quantity);
public record OrderRequest(List<OrderItem> Items, string PickupTime);
