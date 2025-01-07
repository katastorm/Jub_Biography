Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing


function WindowsGo($title, $text, $array) {


$form = New-Object System.Windows.Forms.Form
$form.Text = $title
$form.Size = New-Object System.Drawing.Size(300,200)
$form.StartPosition = 'CenterScreen'

$okButton = New-Object System.Windows.Forms.Button
$okButton.Location = New-Object System.Drawing.Point(75,120)
$okButton.Size = New-Object System.Drawing.Size(75,23)
$okButton.Text = 'OK'
$okButton.DialogResult = [System.Windows.Forms.DialogResult]::OK
$form.AcceptButton = $okButton
$form.Controls.Add($okButton)

$cancelButton = New-Object System.Windows.Forms.Button
$cancelButton.Location = New-Object System.Drawing.Point(150,120)
$cancelButton.Size = New-Object System.Drawing.Size(75,23)
$cancelButton.Text = 'Cancel'
$cancelButton.DialogResult = [System.Windows.Forms.DialogResult]::Cancel
$form.CancelButton = $cancelButton
$form.Controls.Add($cancelButton)

$label = New-Object System.Windows.Forms.Label
$label.Location = New-Object System.Drawing.Point(10,10)
$label.Size = New-Object System.Drawing.Size(280,30)
$label.Text = $text
$form.Controls.Add($label)

$listBox = New-Object System.Windows.Forms.ListBox
$listBox.Location = New-Object System.Drawing.Point(10,50)
$listBox.Size = New-Object System.Drawing.Size(260,20)
$listBox.Height = 80

$array | Foreach-Object {[void] $listBox.Items.Add($_)}




$form.Topmost = $true

$form.Controls.Add($listBox)

$form.Topmost = $true

$result = $form.ShowDialog()

if ($result -eq [System.Windows.Forms.DialogResult]::OK)
{
    $x = $listBox.SelectedItem
    $x
}

""

}



function StartProg(){

set advice.detachedHead false
git fetch


$arr = git branch | Foreach-Object {$_ -replace " ", ""} | Foreach-Object {$_ -replace "\*", ""}

$res1 = WindowsGo "Rebase" "Quelle branche est à modifier ?" $arr

if([string]::IsNullOrEmpty($res1)){
return
}

$res2 = WindowsGo "Rebase : Modifications" "Choisir une branche de référence à appliquer sous $res1" $arr

if([string]::IsNullOrEmpty($res2)){
return
}


#git stash 

$gitRes = git switch $res1
echo $LASTEXITCODE


#if ($gitRes -match 'error'){
if ($LASTEXITCODE -eq 1){
[System.Windows.Forms.MessageBox]::Show("Impossible de changer de branche, assure toi de n'avoir aucun fichier modifier sur ton dernier commit, ou alors d'avoir tout stashed.",'Git bug','OK','Error')
return
}
#[System.Windows.Forms.MessageBox]::Show("Branche actuelle : $res1",'Changement de branche','OK')


git rebase $res2

if ($LASTEXITCODE -eq 1){
[System.Windows.Forms.MessageBox]::Show("Le rebase à échoué, peut-être à cause de fichier unstashed.",'Git bug','OK','Error')
return
}

git push
[System.Windows.Forms.MessageBox]::Show("Verifier la console pour voir si tout est bien.",'Nickel','OK')

$gitRes = git switch $res2
echo $LASTEXITCODE



<#
[void] $listBox.Items.Add('atl-dc-001')
[void] $listBox.Items.Add('atl-dc-002')
[void] $listBox.Items.Add('atl-dc-003')
[void] $listBox.Items.Add('atl-dc-004')
[void] $listBox.Items.Add('atl-dc-005')
[void] $listBox.Items.Add('atl-dc-006')
[void] $listBox.Items.Add('atl-dc-007')
#>

#git branch -r | Foreach-Object {$_ -replace "  ", ""} | Set-Content file.txt
}


$loc = Get-Location
cd .
StartProg
cd $loc


