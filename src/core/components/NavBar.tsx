import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
const NavBar = () => {
  const router = useRouter()
  const user = useCurrentUser()

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              ariaControls="mobile-menu"
              ariaExpanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                ariaHidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                ariaHidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="block h-8 w-auto lg:hidden"
                src="https://cdn.iconscout.com/icon/free/png-512/free-food-kitchen-nonveg-chicken-chistmas-dinner-restaurant-2-10441.png?f=avif&w=512"
                alt="Your Company"
              />
              <img
                className="hidden h-8 w-auto lg:block"
                src="https://cdn.iconscout.com/icon/free/png-512/free-food-kitchen-nonveg-chicken-chistmas-dinner-restaurant-2-10441.png?f=avif&w=512"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  href={Routes.Home()}
                  className={
                    router.pathname == "/"
                      ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  }
                  ariaCurrent="page"
                >
                  Home
                </Link>
                <Link
                  href={Routes.Categories()}
                  className={
                    router.pathname == "/categories"
                      ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  }
                  ariaCurrent="page"
                >
                  Categories
                </Link>
                <Link
                  href={Routes.List()}
                  className={
                    router.pathname == "/recipes"
                      ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  }
                  ariaCurrent="page"
                >
                  Recipes
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                {user && (
                  <Link
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    ariaExpanded="false"
                    ariaHaspopup="true"
                    href={Routes.Account()}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={
                        user.avatar ||
                        "https://otoa-website.s3.us-east-2.amazonaws.com/profiles/no-image.png"
                      }
                      alt=""
                    />
                  </Link>
                )}
                {!user && (
                  <Link
                    href={Routes.LoginPage()}
                    type="button"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    id="user-menu-button"
                    ariaExpanded="false"
                    ariaHaspopup="true"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            href={Routes.Home()}
            className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            Home
          </Link>
          <Link
            href={Routes.Categories()}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Categories
          </Link>
          <Link
            href={Routes.List()}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Recipes
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
