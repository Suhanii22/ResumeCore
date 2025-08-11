


//clicks on get started
document.querySelector(".getstart").addEventListener("click",()=>{
    document.querySelector(".page1").style.display="none";
     document.querySelector(".page2").style.display="block";
})

//clicks on choose

document.addEventListener("DOMContentLoaded", () => {
    const selectedRes = document.getElementById("selectedRes");
    const page2 = document.querySelector(".page2");
    const page3 = document.querySelector(".page3")
    let selected = "";

    Array.from(document.querySelectorAll(".choosebtn")).forEach(element => {
        // console.log(element);
        element.addEventListener("click", () => {

            //         //open page3
            page2.style.display = "none";
            page3.style.display = "flex";



            if (element.id === "choosebtn1") {
                //show res according to choose btn
                selectedRes.src = "templates/res1.html";
                selected = "res1";
            } else if (element.id === "choosebtn2") {
                selectedRes.src = "templates/res2.html";
                selected = "res2";
            } else if (element.id === "choosebtn3") {
                selectedRes.src = "templates/res3.html";
                selected = "res3";
            }


            console.log(selected)
            // Save the selected template name in localStorage
            localStorage.setItem("selectedTemplate", selected);

        })
    });

    //clicking on edit
    const editBtn = document.querySelector(".editbtn");

    editBtn.addEventListener("click", () => {

        document.querySelector(".page3").style.display = "none";

        // Load form into page4, THEN show specific fields
        fetch("form.html")
            .then(res => res.text())
            .then(data => {
                document.querySelector(".page4body").innerHTML = data;
                document.querySelector(".page4").style.display = "flex";

                const selected = localStorage.getItem("selectedTemplate");

                // Show common fields
                document.querySelector(".commonfields").style.display = "block";

                // Hide all unique sections
                document.querySelector(".projectdiv").style.display = "none";
                document.querySelector(".certificatediv").style.display = "none";
                document.querySelector(".experiencediv").style.display = "none";

                // Show unique fields based on selected resume
                if (selected === "res1") {
                    document.querySelector(".projectdiv").style.display = "block";
                } else if (selected === "res2") {
                    document.querySelector(".certificatediv").style.display = "block";
                    document.querySelector(".projectdiv").style.display = "block";
                    document.querySelector(".experiencediv").style.display = "block";
                } else if (selected === "res3") {
                    document.querySelector(".experiencediv").style.display = "block";
                }
                const btn = document.querySelector(".previewButton")
                console.log(btn)
                btn.addEventListener("click", function (e) {
                    e.preventDefault();
                    // Get form values
                    const formdata = {
                        name: document.getElementById("name").value,
                        email: document.getElementById("email").value,
                        phone: document.getElementById("phone").value,
                        address: document.getElementById("address").value,
                        summary: document.getElementById("summary").value,
                        skills: document.getElementById("skills").value,
                        education: document.getElementById("education").value,
                        projects: document.getElementById("projects").value,
                        certificates: document.getElementById("certificates").value,
                        experience: document.getElementById("experience").value,
                    };
                    console.log(data.name, data.phone)
                    localStorage.setItem("userData", JSON.stringify(formdata));


                    // 2. Show Page 5
                    document.querySelector(".page4").style.display = "none";
                    document.querySelector(".page5").style.display = "flex";

                    // 3. Load selected template into resumeContainer
                    const selectedTemplate = localStorage.getItem("selectedTemplate");
                    fetch("templates/" + selectedTemplate + ".html")
                        .then((res) => res.text())
                        .then((html) => {

                            document.querySelector(".resumeContainer").innerHTML = html;
                            setTimeout(() => {
                                insertUserDataIntoResume();
                            }, 0);
                        })

                

                    function insertUserDataIntoResume() {
                        const data = JSON.parse(localStorage.getItem("userData"));
                        if (!data) return;

                        // Insert basic fields
                        document.getElementById("displayName").textContent = data.name || "";
                        document.getElementById("displayAddress").textContent = data.address || "";
                        document.getElementById("displayContact").textContent = data.phone || "";
                        document.getElementById("displayEmail").textContent = data.email || "";
                        document.querySelector(".second-details").textContent = data.summary || "";

                        //  Skills in bullets on same line
                        const skillsContainer = document.querySelector(".third-details");
                        if (skillsContainer) {
                            const skillsArray = data.skills
                                .split(',')
                                .map(skill => skill.trim())
                                .filter(skill => skill !== "");
                            skillsContainer.innerHTML = skillsArray.map(skill => `<span>• ${skill}</span>`).join(" ");
                        }

                        //  Certificates, Projects, Education – bullets in separate lines
                        function setBulletedList(selector, itemsString) {
                            const container = document.querySelector(selector);
                            if (container) {
                                const items = itemsString
                                    .split('\n') 
                                    .map(item => item.trim())
                                    .filter(item => item !== "");
                                container.innerHTML = "<ul>" + items.map(item => `<li>${item}</li>`).join("") + "</ul>";
                            }
                        }

                        setBulletedList(".fourth-details", data.projects || "");
                        setBulletedList(".fifth-details", data.education || "");
                        setBulletedList(".sixth-details", data.certificates || "");

                        // Experience (plain text)
                        // document.querySelector(".seven-details",data.experience || "");
                         setBulletedList(".seven-details", data.experience || "");
                    }



                });

            })


    });




});

Array.from(document.querySelectorAll(".downloadbutton-common")).forEach(element => {
   

element.addEventListener("click", function () {
    const resume = document.getElementById("resume"); // Replace with the actual ID of your resume container
console.log("download clicked")

 resume.style.transform = "none";
        resume.style.width = "793px"; // matches A4 width
        resume.style.height = "auto"; // let it grow naturally
        resume.style.border = "none";





    html2pdf().set({
    margin: 0,
    filename: 'My_Resume.pdf',
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait' }
}).from(resume).save();


});

});


//backbtn
 Array.from(document.querySelectorAll(".backpage")).forEach((element) => {
  element.addEventListener("click", () => {
    if(element.id==="back3"){
        document.querySelector(".page3").style.display="none";
        document.querySelector(".page2").style.display="block";
    }else if(element.id==="back4"){
         document.querySelector(".page4").style.display="none";
        document.querySelector(".page3").style.display="flex";
    }else if(element.id==="back5"){
         document.querySelector(".page5").style.display="none";
        document.querySelector(".page4").style.display="flex";
    }
  });
    });

