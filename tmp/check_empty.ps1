$jsonPath = [System.IO.Path]::Combine((Get-Location).Path, 'lib', 'awards-data.json')
$data = Get-Content $jsonPath -Raw | ConvertFrom-Json
$ed = $data[2].awardEditions[0]
Write-Host (ConvertTo-Json $ed -Depth 3)
