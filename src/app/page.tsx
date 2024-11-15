"use client"; 
import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
 interface JokeResponse{
  setup:string;
  punchline:string;
 }

export default  function RandomJokeCompnent(){
  //state hook for managing the current joke
  const[joke,setJoke]=useState<string>("");

  useEffect(()=>{
    fetchJoke();
  }, []);


async function fetchJoke(): Promise<void> {
  try {
   
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const data: JokeResponse = await response.json();
    // Update state with the fetched joke
    setJoke(`${data.setup} - ${data.punchline}`);
  } catch (error) {
    console.error("Error fetching joke:", error); // Log any errors
    // Set an error message if the fetch fails
    setJoke("Failed to fetch joke. Please try again.");
  }
}
  return (
    <div className="flex flex-col items-center  justify-center h-screen bg-gradient-to-br from-[#ff9100] to-[#ffa66b] p-4">
      <div className="bg-white rounded-2xl flex-justify-center shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-[#333]">
        😂 Random Joke 😂👈

        </h1>
        <div className="bg-[#f5f5f5] flex-justify-center rounded-lg p-6 mb-6 text-[#555] text-lg">
          {joke || "Loading..."}
        </div>
        {/* Button to fetch a new joke */}
        <Button
          onClick={fetchJoke}
          className="bg-[#4caf50] hover:bg-[#43a047] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
        >
          😂 Get New Joke 😂
        </Button>


      </div>
    </div>
  )
}
