import React from 'react'

const Footer = () => {
    const date = new Date().getFullYear();
  return (
    <footer>
        <p>&copy; {date} || Developed by: Reilly, Jed, Jalen and Danial</p>
    </footer>
  )
}

export default Footer