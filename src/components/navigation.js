import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Navigation = ({ isHomePage }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <NavButton open={open} onClick={() => setOpen(!open)}>
        MENU
      </NavButton>

      <Nav className="nav-global" open={open}>
        <NavWrapper className="nav-wrapper">
          <NavLink
            to="/"
            activeClassName="nav-link--active"
            onClick={() => setOpen(false)}
          >
            <span>ADA.NET.NZ</span>
          </NavLink>

          <NavLink to="/tag/symposium2021/" onClick={() => setOpen(false)}>
            <span>Symposium21</span>
          </NavLink>

          <NavLink
            // to={isHomePage ? "#content-home" : "/"}
            to="/artbase/"
            activeClassName="nav-link--active"
            onClick={() => setOpen(false)}
          >
            <span>Artbase</span>
          </NavLink>

          <NavLink
            to="/events/"
            activeClassName="nav-link--active"
            onClick={() => setOpen(false)}
          >
            <span>Events</span>
          </NavLink>

          <NavLink
            to="/library/"
            activeClassName="nav-link--active"
            onClick={() => setOpen(false)}
          >
            <span>Library</span>
          </NavLink>

          <NavLink
            to="/about/about-aotearoa-digital-arts/"
            activeClassName="nav-link--active"
            onClick={() => setOpen(false)}
          >
            <span>About</span>
          </NavLink>

          <NavLink
            to="/artbase/contribute/"
            activeClassName="nav-link--active"
            onClick={() => setOpen(false)}
          >
            <span>Contribute</span>
          </NavLink>

          <NavLinkExternal
            href="https://list.waikato.ac.nz/postorius/lists/ada_list.list.waikato.ac.nz/"
            target="_blank"
            rel="noreferrer"
          >
            <span>Subscribe ⇨</span>
          </NavLinkExternal>
        </NavWrapper>
      </Nav>
    </>
  )
}

const NavButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 777;
  padding: 0.4rem 0.8rem;
  transition: color 300ms, background 300ms;
  color: ${({ open }) => (open ? "black" : "var(--color-primary-light)")};
  border-color: ${({ open }) =>
    open ? "black" : "var(--color-primary-light)"};
  background: ${({ open }) => (open ? "var(--color-primary-light)" : "black")};
  border: 1px solid;
  border-radius: 1rem;

  body {
    overflow-x: hidden;
  }

  @media screen and (min-width: 880px) {
    display: none;
  }
`

const Nav = styled.nav`
  position: fixed;
  background: black;
  padding: 1rem;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 666;
  transition: 400ms ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media screen and (min-width: 880px) {
    transform: translateX(0);
    padding: 0;
    color: white;
    margin: 0 auto;
    position: sticky;
    top: 0;
    border-bottom: 1px solid black;
  }
`

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 880px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
`
const NavLink = styled(Link)`
  font-size: 2.2rem;
  padding: 0.6rem 0.8rem;
  flex: 1;
  transition: background 300ms, color 300ms, border 300ms;

  &:hover {
    color: black;
    background: var(--color-primary-light);
    border-right: 1px solid var(--color-primary-light);
  }

  span {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  @media screen and (min-width: 880px) {
    font-size: 0.8em;
    border-right: 1px solid var(--color-primary);
  }
`
const NavLinkExternal = styled.a`
  font-size: 2.2rem;
  padding: 0.6rem 0.8rem;
  flex: 1;

  &:hover {
    color: black;
    background: var(--color-primary-light);
    border-left-color: black;
  }

  span {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  @media screen and (min-width: 880px) {
    font-size: 0.7em;
  }
`

export default Navigation
