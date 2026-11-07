# 실제 트러블슈팅

## 1. EC2 시작 직후 Nginx 연결 실패 — 해결

| 단계 | 실제 기록 |
| --- | --- |
| 증상 | 2026-11-07 21:18 KST 무렵 SSH 접속은 성공했지만 `systemctl is-active nginx`는 `inactive`, `curl http://localhost/`는 연결 실패(`curl: (7)`)였다. |
| 가설 | user data의 `dnf install nginx`가 아직 진행 중이어서 서비스가 시작되지 않았을 수 있다. |
| 검증 | `cloud-init status`가 `running`이었고 `/var/log/b3-1-bootstrap.log`에 Amazon Linux 저장소 메타데이터 다운로드와 Nginx 패키지 설치 트랜잭션이 나타났다. 서버에서 `https://example.com` 요청은 이미 `200`이어서 외부 라우팅 자체는 정상이었다. |
| 조치 | 설치를 중복 실행하지 않고 `cloud-init status --wait`로 완료를 기다린 뒤 동일한 명령을 재실행했다. |
| 결과 | `cloud-init status: done`, Nginx `active`, localhost `/` HTTP `200`, `/health` 본문 `OK`, 서버의 외부 요청 HTTP `200`을 확인했다. 외부 Chrome에서도 페이지가 열렸다. |
| 재발 방지 | EC2의 `running` 상태와 애플리케이션 준비 상태를 분리해서 확인한다. 배포 스크립트 끝에 Nginx 설정 검사와 localhost health 요청을 둔다. |

## 2. 보안 그룹 콘솔의 규칙 목록 조회 거부 — 콘솔 표시는 미해결, CLI로 규칙 검증

보안 그룹 상세 화면에서 `ec2:DescribeSecurityGroupRules` 권한 부족 메시지가 나타났다. VPC 콘솔의 DHCP·NAT 관련 조회와 EC2의 Compute Optimizer 부가 정보도 같은 이유로 일부 표시되지 않았다. 이는 EC2나 Nginx의 네트워크 실패가 아니라 **콘솔이 추가 조회 API를 호출하는 문제**였다.

권한을 임의로 넓히지 않고, 기존 정책에 허용된 `ec2:DescribeSecurityGroups`로 실제 인바운드 규칙을 조회했다. 결과는 `80/tcp = 0.0.0.0/0`, `22/tcp = 실습자 공인 IP/32`이며 다른 인바운드 규칙은 없다. CLI 조회와 외부 HTTP/SSH 성공으로 구성은 검증됐지만, 콘솔의 해당 규칙 목록 표시 오류는 해결하지 않았다. [오류 문구의 실제 화면 일부](screenshots/07-iam-console-read-denied.png)는 계정 정보가 보이지 않게 잘랐다.
