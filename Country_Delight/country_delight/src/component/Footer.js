import React from 'react'
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <div>
      <footer className="bg-light text-center text-lg-start">
        <div className="text-center p-3">
          © 2023 Copyright: <Link className="text-dark" to="https://countrydelight.com/">CountryDelight.com</Link>
        </div>
      </footer>
    </div>
  )
}
