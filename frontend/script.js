
function generateAPK() {
    let websiteUrl = document.getElementById("websiteUrl").value;
    let zipFile = document.getElementById("zipFile").files[0];

    if (!websiteUrl && !zipFile) {
        alert("Please provide a Website URL or upload a ZIP file.");
        return;
    }

    let formData = new FormData();
    formData.append("websiteUrl", websiteUrl);
    if (zipFile) formData.append("zipFile", zipFile);

    fetch('/generate-apk', {
        method: "POST",
        body: formData
    }).then(response => response.json())
      .then(data => {
          document.getElementById("status").innerText = data.message;
      }).catch(error => {
          console.error("Error:", error);
      });
}
    