import styles from  "./home.module.css";
import React, { useState } from 'react';
import Page from "./home/page";

export default async function Home(){
  async function GetUser(){
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await response.json();
    return data;
  }
  let users = await GetUser();

  
  return(
    <div>
     <Page/>
    </div>
  )
}
