// dashboard.js
// Handles admin dashboard stats (analytics)

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/dashboard/stats");
    const stats = await response.json();

    if (response.ok) {
      document.getElementById("totalUsers").textContent = stats.totalUsers || 0;
      document.getElementById("totalTests").textContent = stats.totalTests || 0;
      document.getElementById("totalMaterials").textContent = stats.totalMaterials || 0;
    } else {
      console.error("Failed to load dashboard stats");
    }
  } catch (error) {
    console.error("Dashboard fetch error:", error);
  }
});
