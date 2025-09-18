// test.js
// Handles fetching and displaying tests, quiz answering

document.addEventListener("DOMContentLoaded", async () => {
  const testList = document.getElementById("testList");
  const quizContainer = document.getElementById("quizContainer");

  // ---------------- Load Tests ----------------
  if (testList) {
    try {
      const response = await fetch("/api/tests");
      const tests = await response.json();

      if (tests.length === 0) {
        testList.innerHTML = "<p>No tests available yet.</p>";
        return;
      }

      tests.forEach((test) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${test.title}</strong> - ${test.duration} mins
          <button data-id="${test.id}" class="startTestBtn">Start</button>
        `;
        testList.appendChild(li);
      });

      document.querySelectorAll(".startTestBtn").forEach((btn) => {
        btn.addEventListener("click", () => startTest(btn.dataset.id));
      });
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  }

  // ---------------- Start Test ----------------
  async function startTest(testId) {
    quizContainer.innerHTML = "<p>Loading test...</p>";

    try {
      const response = await fetch(`/api/tests/${testId}`);
      const questions = await response.json();

      if (questions.length === 0) {
        quizContainer.innerHTML = "<p>No questions found for this test.</p>";
        return;
      }

      quizContainer.innerHTML = "";
      questions.forEach((q, index) => {
        const div = document.createElement("div");
        div.classList.add("question-block");

        div.innerHTML = `
          <h4>Q${index + 1}: ${q.question_text}</h4>
          <label><input type="radio" name="q${q.id}" value="A"> ${q.option_a}</label><br>
          <label><input type="radio" name="q${q.id}" value="B"> ${q.option_b}</label><br>
          <label><input type="radio" name="q${q.id}" value="C"> ${q.option_c}</label><br>
          <label><input type="radio" name="q${q.id}" value="D"> ${q.option_d}</label><br>
        `;

        quizContainer.appendChild(div);
      });

      const submitBtn = document.createElement("button");
      submitBtn.textContent = "Submit Test";
      submitBtn.classList.add("btn");
      quizContainer.appendChild(submitBtn);

      submitBtn.addEventListener("click", () => submitTest(questions));
    } catch (error) {
      console.error("Error loading test:", error);
      quizContainer.innerHTML = "<p>Error loading test.</p>";
    }
  }

  // ---------------- Submit Test ----------------
  function submitTest(questions) {
    let score = 0;

    questions.forEach((q) => {
      const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
      if (selected && selected.value === q.correct_option) {
        score++;
      }
    });

    alert(`✅ Test Completed! Your Score: ${score}/${questions.length}`);
  }
});
