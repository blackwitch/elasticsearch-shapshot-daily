# elasticsearch-shapshot-daily

일자별로 생성되는 인덱스의 스냅샷을 매일 오전에 생성하는 코드입니다. 

실행 전 config.json에서 필요한 내용을 설정하세요. 

FILE : config.json
~~~
{
	"esRepoName" : "사용할 저장소 이름을 설정합니다.",
	"esAddr" : "elasticsearch의 주소를 입력하세요.",
	"index_prefix" : "날짜를 제외한 인덱스 이름을 설정하세요. 인덱스 이름은 index_prefixyyyy.mm.dd로 가정합니다. 수정이 필요한 경우 makeSnapshot로 전달되는 _day 인자값을 조정하세요.", 
	"snapshot_prefix" : "daily-", // index_prefix앞에 daily-를 추가합니다.
	"schedule_cron" : "0 0 9 * * *"  // 스케쥴이 실행될 시점을 설정하세요. 기본은 오전 9시 입니다.
}
~~~
