import Image from 'next/image'
import { getAllBoardMembers } from '../../lib/contentful'
import Layout from '../../src/components/layout-next'
import Container from '../../src/components/container'
import '../../src/components/board.css'

export const metadata = {
  title: 'Board | Milwaukee Garden District Neighborhood Association',
  description: 'Meet the board members of the Milwaukee Garden District Neighborhood Association.',
}

export default async function BoardPage() {
  const boardMembers = await getAllBoardMembers()

  return (
    <Layout>
      <Container>
        <div className="flexing">
          {boardMembers.map((member) => {
            const { fields } = member
            return (
              <div key={member.sys.id} className="box1 box">
                <div>
                  <h4>{fields.name}</h4>
                  <div className="image-container">
                    {fields.bioPhotos && (
                      <Image
                        className="board_member_photo"
                        src={`https:${fields.bioPhotos.fields.file.url}`}
                        alt={fields.name}
                        width={300}
                        height={300}
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                    )}
                  </div>
                  {fields.biography && (
                    <p>{fields.biography}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Layout>
  )
}