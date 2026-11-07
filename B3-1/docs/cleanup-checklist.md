# 리소스 정리 체크리스트

대상 리전: `ap-northeast-2` · 태그: `Project=codyssey-b3-1`. 아래 ID는 이번 재실습에서 직접 생성한 리소스다. 다른 프로젝트 리소스는 정리 대상이 아니다.

| 대상 | ID | 현재 확인 상태 |
| --- | --- | --- |
| EC2 | `i-0a76df902e9cc612e` | 정리 전: 실행 중 |
| EBS gp3 8 GiB | `vol-025f214189fff2a5a` | 정리 전: 사용 중, EC2 종료 시 자동 삭제 설정 |
| 자동 공인 IPv4 | `43.203.189.145` | 정리 전: 인스턴스에 할당 |
| Elastic IP | 미생성 | 할당·해제 대상 없음 |
| Key pair | `codyssey-b3-1-redo-key` | 정리 전: AWS 키 페어와 로컬 `~/.ssh/` 개인 키 있음 |
| Security Group | `sg-07d3486fa5ccca65e` | 정리 전: 사용 중 |
| Route Table | `rtb-04bef0dc67040b1d6` · 연결 `rtbassoc-0144f78e3b4047ed1` | 정리 전: 서브넷에 연결 |
| Internet Gateway | `igw-0e77008855e956e1a` | 정리 전: VPC에 연결 |
| Public Subnet | `subnet-0098866f20a587e34` | 정리 전: 사용 중 |
| VPC | `vpc-0cae806ded5786900` | 정리 전: 사용 중 |
| NAT Gateway / Load Balancer / RDS | 미생성 | 이번 재실습에서 생성하지 않음 |
| IAM 사용자·고객 관리형 정책 | `codyssey-b3-1` · `codyssey-b3-1-ec2-lab` | 실습 종료 시 계정 소유자가 루트 콘솔에서 삭제하기로 선택함. 인프라 정리 후 상태 확인 예정 |

정리 순서: EC2 종료 확인 → EBS·자동 공인 IP 해제 확인 → 키 페어와 로컬 개인 키 삭제 → 보안 그룹 삭제 → 라우팅 테이블 연결 해제·삭제 → Internet Gateway 분리·삭제 → 서브넷 삭제 → VPC 삭제. 삭제 후 태그와 개별 ID로 잔여 자원을 다시 조회한다.
