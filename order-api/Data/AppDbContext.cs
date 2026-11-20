using Microsoft.EntityFrameworkCore;
using Order.API.Models;

namespace Order.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<MenuItem> MenuItems => Set<MenuItem>();
    public DbSet<OrderItem> Orders => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<MenuItem>().HasData(
            new MenuItem { Id = 1, Name = "Phở Bò Đặc Biệt", Price = 65000, Category = "Món chính", Description = "Nước dùng hầm xương 12 tiếng, tái nạm gầu gân", IsAvailable = true },
            new MenuItem { Id = 2, Name = "Cơm Tấm Sườn Bì Chả", Price = 55000, Category = "Món chính", Description = "Sườn nướng mật ong kèm bì chả trứng hấp", IsAvailable = true },
            new MenuItem { Id = 3, Name = "Bún Chả Hà Nội", Price = 50000, Category = "Món chính", Description = "Chả viên và thịt ba chỉ nướng than hoa", IsAvailable = true },
            new MenuItem { Id = 4, Name = "Gỏi Cuốn Tôm Thịt", Price = 35000, Category = "Khai vị", Description = "Phần 3 cuốn kèm tương đậu phộng đậm đà", IsAvailable = true },
            new MenuItem { Id = 5, Name = "Trà Đào Cam Sả", Price = 30000, Category = "Đồ uống", Description = "Trà đen ủ lạnh cùng đào ngâm và sả tươi", IsAvailable = true },
            new MenuItem { Id = 6, Name = "Cà Phê Sữa Đá", Price = 25000, Category = "Đồ uống", Description = "Cà phê phin truyền thống đậm vị", IsAvailable = true }
        );
    }
}
