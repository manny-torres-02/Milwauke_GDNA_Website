import * as React from 'react'
import Layout from '../components/layout'
import { graphql, useStaticQuery } from 'gatsby'
import '../components/global.css'
import '../components/board.css'
import '../components/variables.css'
import Container from '../components/container'
// import '../components/global.css'
const Board = () => {

  const test4 = useStaticQuery(graphql`
    query test4 {
      allContentfulBoardMember2 {
        edges {
          node {
            name
            bioPhotos {
              url
            }
            biography {
              biography
            }
          }
        }
      }
    }
  `)
  // console.log(testBoard)

  console.log(test4)

  const books = [
    {
      name: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'fiction',
      year_published: 1813,
      id: 1,
    },
    {
      name: 'The Great Gatsby',
      author: ' F. Scott Fitzgerald',
      genre: 'tragedy',
      year_published: 1925,
      id: 2,
    },
  ]

  return (
    <Layout>
      {/* <div>
        {
            test3.allContentfulBoardMembers.nodes.map(nodes => 
            <div>
              <h4> {nodes.boardMember}</h4>
              <p> {nodes.boardMemberPhoto.file.url} </p>
              {/* <p> {nodes.childContentfulBoardMembersTestfieldTextNode.id}</p> */}
      {/* <h4>{nodes.boardMember}</h4> */}
      {/* <img className="board_member_photo" src = {nodes.boardMemberPhoto.file.url}/> */}
      {/* <p>{nodes.boardMemberDescription.raw}</p> */}
      {/* <p>{nodes.internal.}</p> */}

      {/* <p> {nodes.boardMember}</p> */}
      {/* </div>) */}

      {/* } */}

      {/* </div> */}

      {
        <Container>
        <div className="flexing">
          {test4.allContentfulBoardMember2.edges.map((edges) => (
            // <div className='container'>
            <div className=" box1 box">
              <div className=" box2">
                {/* <p> {edges.node.id} </p> */}
                <h4
                className=''> {edges.node.name} </h4>
                <img
                  className="board_member_photo"
                  src={edges.node.bioPhotos.url}
                />
                {/* <p>{edges.node.bioPhotos.filename} </p> */}
                <p> {edges.node.biography.biography}</p>
                {/* </div> */}
              </div>
            </div>
          ))}
        </div>
        </Container>
      }
    </Layout>
  )
}

export default Board
