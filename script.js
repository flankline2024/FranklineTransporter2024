function validateForm() {
    // Reset error messages
    let valid = true;
    document.getElementById('firstNameError').style.display = 'none';
    document.getElementById('lastNameError').style.display = 'none';
    document.getElementById('phoneError').style.display = 'none';
    
    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Validate First Name
    if (!firstName) {
        document.getElementById('firstNameError').style.display = 'block';
        valid = false;
    }

    // Validate Last Name
    if (!lastName) {
        document.getElementById('lastNameError').style.display = 'block';
        valid = false;
    }

    // Validate Phone Number (must be 10 digits)
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById('phoneError').style.display = 'block';
        valid = false;
    }

    if (valid) {
        // If validation passes, call the function to share the info and generate the PDF
        shareWebsiteInfo();
    }

    // Return false to prevent form submission (handled by JavaScript)
    return false;
}

function shareWebsiteInfo() {
    // Get the values from your form or variables
    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const vehicle = document.getElementById('vehicle').value;
    const fromCounty = document.getElementById('fromCounty').value;
    const toCounty = document.getElementById('toCounty').value;
    const cost = document.getElementById('cost').value;
    const whatsappPhoneNumber = '254723971206';
    
    // Build the message to include in the PDF and for sharing
    const message = `Check out this transport service!\n\nName: ${firstName} ${middleName} ${lastName}\nPhone: ${phone}\nVehicle: ${vehicle}\nFrom: ${fromCounty}\nTo: ${toCounty}\nCost: ${cost}`;
    
    // Generate the PDF using jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text(message, 10, 10); // Add the message to the PDF at coordinates (10, 10)
    
    // Create a Blob from the PDF content
    const pdfBlob = doc.output('blob');
    
    // Create a download link for the generated PDF
    const pdfLink = URL.createObjectURL(pdfBlob);
    
    // Create the message with the PDF link (for email/WhatsApp sharing)
    const shareMessage = `Check out this transport service!\n\nName: ${firstName} ${middleName} ${lastName}\nPhone: ${phone}\nVehicle: ${vehicle}\nFrom: ${fromCounty}\nTo: ${toCounty}\nCost: ${cost}\nYou can download the PDF here: ${pdfLink}`;
    
    // Define email and WhatsApp sharing links with the PDF link
    const emailLink = `mailto:kingij632@gmail.com?subject=Check out this transport service&body=${encodeURIComponent(shareMessage)}`;
    const whatsappLink = `https://wa.me/${whatsappPhoneNumber}?text=${encodeURIComponent(shareMessage)}`;
    
    // Prompt the user to choose Email or WhatsApp
    const userChoice = confirm("Would you like to share the PDF via Email? Click 'OK' for Email, 'Cancel' for WhatsApp.");

    if (userChoice) {
        // Open Email client via mailto with the link to the PDF
        window.location.href = emailLink;
    } else {
        // Open WhatsApp via WhatsApp Web with the PDF link
        window.location.href = whatsappLink;
    }

    // Automatically download the generated PDF
    const downloadLink = document.createElement('a');
    downloadLink.href = pdfLink;
    downloadLink.download = 'Transport_Service_Details.pdf'; // File will be named "Transport_Service_Details.pdf"
    downloadLink.click(); // Trigger the download
}
