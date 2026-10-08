import EmptyState from './EmptyState.jsx'
import ResourceCard from './ResourceCard.jsx'

export default function ResourceList({ resources }) {
  if (resources.length === 0) {
    return <EmptyState title="아직 모아둔 자료가 없어요" description="읽다가 궁금해진 이름이나 문화, 음악을 이곳에 모아보세요." />
  }
  return <ul className="resource-list">{resources.map((resource) => <li key={resource.id}><ResourceCard resource={resource} /></li>)}</ul>
}
