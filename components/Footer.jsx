import React from 'react'

const Footer = () => {
    const date = new Date().getFullYear();
  return (
    <footer>
        <p>Year: {date} . Authors : Reilly Jed Jalen Danial</p>
    </footer>
  )
}

export default Footer