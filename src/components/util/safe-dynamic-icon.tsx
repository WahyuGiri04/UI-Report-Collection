import { icons, LucideProps } from "lucide-react"

type Props = {
  name?: string | null
} & LucideProps

export function SafeDynamicIcon({ name, ...props }: Props) {
  name = name?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  const Icon = icons[name as keyof typeof icons]
  return Icon ? <Icon {...props} /> : null
}
