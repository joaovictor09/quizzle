import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function QuizzesSkeleton() {
  return (
    <div className="mt-10 grid grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <Skeleton className="h-10 w-[60%]" />
              <Skeleton className="h-10 w-10" />
            </CardTitle>

            <Skeleton className="h-5 w-[30%]" />
            <Skeleton className="h-5 w-[50%]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
