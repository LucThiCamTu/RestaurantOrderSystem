namespace Shared.Contracts;

// Dữ liệu chi tiết từng món trong đơn hàng
public record OrderItemDto(
    int MenuItemId,
    string MenuItemName,
    int Quantity,
    decimal UnitPrice
);

// Sự kiện phát ra từ Order.API khi khách đặt món thành công -> Gửi sang Kitchen.Worker
public record OrderCreatedEvent(
    Guid OrderId,
    string CustomerName,
    List<OrderItemDto> Items,
    DateTime CreatedAt
);

// Sự kiện phát ra từ Kitchen.Worker khi bếp đổi trạng thái món -> Gửi sang Notification.Service
public record OrderStatusChangedEvent(
    Guid OrderId,
    string CustomerName,
    OrderStatus NewStatus,
    DateTime UpdatedAt
);