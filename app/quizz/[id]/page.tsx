type QuizzProps = {
  params: {
    id: string
  }
}

export default function Quizz({ params: { id } }: QuizzProps) {
  return <div>Quizz {id}</div>
}
