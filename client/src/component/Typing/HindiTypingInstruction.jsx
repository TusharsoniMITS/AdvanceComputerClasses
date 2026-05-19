import React from 'react';

function BhashaIndiaInstructions() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bhasha India Download and Installation Instructions</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-2">Step 1: Visit the Bhasha India Website</h2>
        <p>1. Open the following link in your browser:</p>
        <p>
          <a href="https://www.microsoft.com/en-in/bhashaindia/downloads" 
            className="text-blue-500 hover:underline" 
            target="_blank" 
            rel="noopener noreferrer">
            Bhasha India Downloads
          </a>
        </p>
      </section>
      
      <section className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Step 2: Download the Software</h2>
        <p>1. Once you're on the Bhasha India Downloads page, you will see different options for downloading the software.</p>
        <p>2. Find the download button for **Indic Input 3** (the latest version).</p>
        <p>3. Click on the **Download** button to start the download process.</p>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Step 3: Install the Software</h2>
        <p>1. After the download is complete, go to your Downloads folder and locate the downloaded file.</p>
        <p>2. Double-click the file to begin the installation process.</p>
        <p>3. Follow the setup instructions by clicking **Next** and then **Install**.</p>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Step 4: Configure the Language</h2>
        <p>1. After the installation, go to your **Settings** and navigate to **Time & Language**.</p>
        <p>2. Click on **Language** and then **Add a Language**. Select **Hindi** or any other Indian language.</p>
        <p>3. Install the language pack if not already installed.</p>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Step 5: Set Up the Keyboard Layout</h2>
        <p>1. Under **Language Options**, click **Add a keyboard**.</p>
        <p>2. Choose the appropriate keyboard layout like **Hindi (Inscript)** or **Hindi (Remington Gail)**.</p>
        <p>3. Switch between English and Hindi using **Windows + Spacebar** (on Windows).</p>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Step 6: Start Typing in Hindi</h2>
        <p>1. Open a text editor (e.g., Notepad or MS Word).</p>
        <p>2. Switch to the Hindi keyboard layout, and start typing in Hindi!</p>
      </section>
    </div>
  );
}

export default BhashaIndiaInstructions;
