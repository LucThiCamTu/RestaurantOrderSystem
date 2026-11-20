using Microsoft.EntityFrameworkCore;
using Order.API.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.UseCors();

app.MapGet("/api/health", () => Results.Ok(new
{
    success = true,
    message = "Restaurant Order System (.NET 10) đang hoạt động bình thường!",
    timestamp = DateTime.UtcNow
}));

app.MapGet("/menu", async (AppDbContext db) =>
{
    var items = await db.MenuItems.Where(m => m.IsAvailable).ToListAsync();
    return Results.Ok(items);
});

app.MapGet("/api/menu", async (AppDbContext db) =>
{
    var items = await db.MenuItems.Where(m => m.IsAvailable).ToListAsync();
    return Results.Ok(new { success = true, data = items });
});

app.Run();
