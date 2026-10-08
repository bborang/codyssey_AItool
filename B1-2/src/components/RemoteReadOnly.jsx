import LinkButton from './LinkButton.jsx'

export default function RemoteReadOnly({ title }) {
  return <section><h1>{title}</h1><p className="introduction">현재 Supabase 조회 연결 단계입니다. 원격 등록·수정·삭제는 다음 단계에서 연결합니다.</p><div className="page-actions"><LinkButton to="/books">나의 책장으로</LinkButton></div></section>
}
