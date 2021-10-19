import React, { useState } from "react"
import { Link } from "gatsby"
// import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const Navigation = () => {
  // const { menu } = useStaticQuery(
  //   graphql`
  //     query MyQuery {
  //       wpMenu {
  //         id
  //         menuItems {
  //           nodes {
  //             parentId
  //             label
  //             path
  //             childItems {
  //               nodes {
  //                 path
  //                 label
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `
  // )
  // console.log(menu)

  const [open, setOpen] = useState(false)

  return (
    <>
      <NavButton open={open} onClick={() => setOpen(!open)}>
        ⇧
      </NavButton>

      <Nav className="nav-global" open={open}>
        <NavWrapper className="nav-wrapper">
          <NavLink
            to="/"
            activeClassName="nav-link--active"
            onClick={() => setOpen(false)}
          >
            <span>Artbase</span>
          </NavLink>

          <NavLink
            to="/events/symposia/symposium2014-symposia/civics-and-social/"
            activeClassName="nav-link--active"
            onClick={() => setOpen(false)}
          >
            <span>Events</span>
          </NavLink>

          <NavLink
            to="/library/a-transitional-imaginary-space-network-and-memory-in-christchurch/"
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

          <NavLink
            to="/symposium2021/call-for-participation-ada-symposium-poneke-wellington-indeterminate-infrastructures-objects-signals-and-architectures/"
            activeClassName="nav-link--active"
            onClick={() => setOpen(false)}
          >
            <span>Symposium21</span>
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
  top: 20vh;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 666;
  transition: 400ms ease-in-out;
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(100%)")};
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media screen and (min-width: 940px) {
    transform: translateY(0);
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

  @media screen and (min-width: 940px) {
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

  @media screen and (min-width: 940px) {
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

  @media screen and (min-width: 940px) {
    font-size: 0.8em;
  }
`

export default Navigation
