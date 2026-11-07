# 리소스 정리 체크리스트

대상 리전: `ap-northeast-2` · 태그: `Project=codyssey-b3-1`. 아래 ID는 이번 재실습에서 직접 생성한 리소스다. 다른 프로젝트 리소스는 정리 대상이 아니다.

| 대상 | ID | 현재 확인 상태 |
| --- | --- | --- |
| EC2 | `i-0a76df902e9cc612e` | **종료 완료**: 11/07 `terminated`와 공인 IP `null` 확인, 11/08 재조회 `[]` |
| EBS gp3 8 GiB | `vol-025f214189fff2a5a` | **삭제 완료**: EC2 종료 시 자동 삭제; 태그 재조회 `[]` |
| 자동 공인 IPv4 | `43.203.189.145` | **해제 확인**: 종료된 EC2에 공인 IP `null`; 별도 할당 자원 없음 |
| Elastic IP | 미생성 | 할당·해제 대상 없음; 태그 재조회 `[]` |
| Key pair | `codyssey-b3-1-redo-key` | **삭제 완료**: AWS 키 페어 재조회 `[]`, 로컬 `~/.ssh/codyssey-b3-1-redo.pem` 파일 제거 확인 |
| Security Group | `sg-07d3486fa5ccca65e` | **삭제 완료**: 태그 재조회 `[]` |
| Route Table | `rtb-04bef0dc67040b1d6` · 연결 `rtbassoc-0144f78e3b4047ed1` | **연결 해제·삭제 완료**: 태그 재조회 `[]` |
| Internet Gateway | `igw-0e77008855e956e1a` | **VPC 분리·삭제 완료**: 태그 재조회 `[]` |
| Public Subnet | `subnet-0098866f20a587e34` | **삭제 완료**: 태그 재조회 `[]` |
| VPC | `vpc-0cae806ded5786900` | **삭제 완료**: 태그 재조회 `[]`, [콘솔 검색 결과 0건](screenshots/08-vpc-deleted.png) |
| 네트워크 인터페이스 | EC2가 자동 생성 | **잔여 없음**: 이번 VPC ID로 조회 `[]` |
| NAT Gateway / Load Balancer / RDS | 미생성 | 이번 재실습에서 생성하지 않음 |
| IAM 사용자·고객 관리형 정책 | `codyssey-b3-1` · `codyssey-b3-1-ec2-lab` | **미완료**: 계정 소유자의 루트 콘솔 조작 필요. 삭제 후 확인 예정 |

실제 정리 순서: EC2 종료 확인 → EBS·자동 공인 IP 해제 확인 → 키 페어와 로컬 개인 키 삭제 → 보안 그룹 삭제 → 라우팅 테이블 연결 해제·삭제 → Internet Gateway 분리·삭제 → 서브넷 삭제 → VPC 삭제. 2026-11-08 00:40 KST에 과제 태그로 EC2·EBS·VPC·서브넷·라우팅 테이블·게이트웨이·보안 그룹·키 페어·Elastic IP를 다시 조회했고 모두 `[]`였다. 이번 VPC ID의 네트워크 인터페이스도 `[]`였다. 다른 프로젝트 리소스는 삭제하지 않았다.

**남은 확인:** IAM 사용자·정책 삭제는 과제용 IAM 권한으로 할 수 없어 계정 소유자가 루트 콘솔에서 진행해야 한다. Billing Dashboard의 최종 과금 반영 여부는 아직 확인되지 않았다.
