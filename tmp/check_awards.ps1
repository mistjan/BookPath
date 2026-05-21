$data = Get-Content 'C:\Users\56265\Documents\BookPath\lib\awards-data.json' -Raw | ConvertFrom-Json
foreach ($a in $data) {
    $edCount = $a.awardEditions.Count
    $hasWork = 0
    foreach ($ed in $a.awardEditions) {
        if ($ed.workItems.Count -gt 0 -or $ed.authorItems.Count -gt 0) { $hasWork++ }
    }
    Write-Host ('{0,-35} editions:{1,3} filled:{2,3}' -f $a.nameCn, $edCount, $hasWork)
}
