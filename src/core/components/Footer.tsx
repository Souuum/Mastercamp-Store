import { Routes } from "@blitzjs/next"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-800 w-full h-full">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-gray-300 px-3 py-2 text-sm font-medium0">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Recipe
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link
              href={Routes.About()}
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href={Routes.Privacy()}
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href={Routes.Rules()}
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Rules
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
