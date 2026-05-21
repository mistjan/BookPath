$jsonPath = Join-Path (Get-Location).Path 'lib' 'awards-data.json'
$data = Get-Content $jsonPath -Raw | ConvertFrom-Json
$awards = @('普利策小说奖','国际布克奖','美国国家图书奖小说奖','都柏林文学奖','星云奖','芥川龙之介奖','直木三十五奖')
foreach ($name in $awards) {
    $a = $data | Where-Object { $_.nameCn -eq $name }
    $eds = $a.awardEditions
    $years = $eds | ForEach-Object { $_.awardYear } | Sort-Object
    $count = $eds.Length
    $first = $years[0]
    $last = $years[-1]
    Write-Host "  :  editions - \
}
