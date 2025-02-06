
// async function submitForm(event) {
//     event.preventDefault(); // Prevent page reload

//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     try{
//         const response = await fetch('http://10.12.5.250:3000/api/data', { 
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ name, email }),
//         });
    
//         if (response.ok) {
//           alert('Data submitted successfully!');
//         } else {
//           alert('Failed to submit data.');
//         }

//     } catch(error){
//         console.log("fetch failed", error.message)
//     }
//   }
async function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const gender = document.getElementById('gender').value;

  try {
    const response = await fetch('http://10.12.5.250:3000/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, gender }),
    });

    const responseData = await response.json();  // Always parse JSON first

    if (response.ok) {
      console.log('Success:', responseData);
      window.location.href = `survey.html?userId=${responseData.userId}`;
    } else {
      alert(`Error: ${responseData.error || 'Unknown error'}`);
    }
    
  } catch (error) {
    console.error('Submission failed:', error);
    alert('Failed to connect to server. Please try again.');
  }
}


// function to handle survey submission
async function submitSurvey(event) {
    event.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    
    const answers = {
      q1: document.querySelector('input[name="q1"]:checked').value,
      q2: document.querySelector('input[name="q2"]:checked').value,
      
    };
  
    try {
      const response = await fetch('http://10.12.5.250:3000/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, answers }),
      });
  
      if (response.ok) {
        alert('Survey submitted successfully!');
      } else {
        alert('Failed to submit survey.');
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  }
  

