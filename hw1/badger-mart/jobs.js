function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    // TODO: Alert the user of the job that they applied for!
    const allJobs = document.getElementsByName('job');

    // wrong version: forEach is not breakable
    // allJobs.forEach(job => {
    //     console.log(1);
    //     if (job.checked) {
    //         alert(`You applied for ${job.value}`);
    //         break;
    //     }
    // });

    for(let job of allJobs) {
        if (job.checked) {
            alert(`Thank you for applying to be a ${job.value}`);
            return;
        }
    }
    alert('Please select a job!');
    
}