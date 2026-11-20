namespace Order.API.Models;

public class OrderItem
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public int MenuItemId { get; set; }
    public MenuItem? MenuItem { get; set; }
    public int Quantity { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = "Pending";
}
