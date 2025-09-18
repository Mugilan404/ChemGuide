// admin.js
// Handles admin actions: uploading study materials & creating tests

// ---------------- Upload Study Materials ----------------
document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("uploadMaterialForm");

  if (uploadForm) {
    uploadForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(uploadForm);

      try {
        const response = await fetch("/api/materials/upload", {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        if (response.ok) {
          alert("✅ Material uploaded successfully!");
          uploadForm.reset();
        } else {
          alert("❌ Failed to upload material: " + result.error);
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("❌ Server error while uploading material");
      }
    });
  }

  // ---------------- Create Test ----------------
  const testForm = document.getElementById("createTestForm");

  if (testForm) {
    testForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(testForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/api/tests/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          alert("✅ Test created successfully!");
          testForm.reset();
        } else {
          alert("❌ Failed to create test: " + result.error);
        }
      } catch (error) {
        console.error("Test create error:", error);
        alert("❌ Server error while creating test");
      }
    });
  }
});
