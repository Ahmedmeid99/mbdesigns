$ErrorActionPreference = 'Stop'

$destination = Join-Path $PSScriptRoot '..\.media-upgrade\images'
New-Item -ItemType Directory -Force -Path $destination | Out-Null

$assets = @(
  @('residential-hero-source.jpg', 'beb217_ee2658dc4a9941fabb22915760b7416f~mv2.jpg'),
  @('retail-hero-source.jpg', 'beb217_b2fecdc8fe12401ea5cf8b822ae74956~mv2.jpg'),
  @('hospitality-hero-source.jpg', 'beb217_35428ac60a08491c8d8eac9cd21dd334~mv2.jpg'),
  @('corporate-01-source.jpg', 'beb217_543962d2e9aa4f08a0db161a44c1f8c1~mv2.jpg'),
  @('corporate-02-source.jpg', 'beb217_45f2a1b363c04e12b13d6e95428570b9~mv2.jpg'),
  @('corporate-03-source.jpeg', 'beb217_5c194231936040d899f7c94b0add83ae~mv2.jpeg'),
  @('corporate-04-source.jpg', 'beb217_412229aa7c514e0b9cdfdfe78100d128~mv2.jpg'),
  @('corporate-05-source.jpeg', 'beb217_741d55659b9941408d5c62ee4229ecef~mv2.jpeg'),
  @('corporate-06-source.jpg', 'beb217_fd44a0869aa0484386f1a9391d49bd9c~mv2.jpg'),
  @('corporate-07-source.jpg', 'beb217_59114462116b49bf8653e8114048789a~mv2.jpg'),
  @('corporate-08-source.jpg', 'beb217_fb50fcda25b34b629d00d818bab6286f~mv2.jpg'),
  @('residential-01-source.jpg', 'beb217_f440429edf7e403f9a677ecebd70f310~mv2.jpg'),
  @('residential-02-source.jpg', 'beb217_9defc27f214f409bbe71ead5bc59820f~mv2.jpg'),
  @('residential-03-source.jpg', 'beb217_d4505653e4a74da3acf86ccdabb61659~mv2.jpg'),
  @('residential-04-source.jpg', 'beb217_8be6a708ef07463ea84fe5aa907673fc~mv2.jpg'),
  @('residential-05-source.jpeg', 'beb217_397d2a2ed8404eb18c9a0bd887b1cf61~mv2.jpeg'),
  @('residential-06-source.jpg', 'beb217_fd0cea95f630431caa093ad7212206ea~mv2.jpg'),
  @('residential-07-source.jpg', 'beb217_9577c74bebe549f5a23783f8a1b8cbb4~mv2.jpg'),
  @('residential-08-source.jpg', 'beb217_02fc38ce60da45e2b50e93b2273ae927~mv2.jpg'),
  @('residential-09-source.jpeg', 'beb217_9c9957ea8ea84c6581b33864bef40b47~mv2.jpeg'),
  @('residential-10-source.jpeg', 'beb217_ac0d98abf77e486a821f1c3499dde362~mv2.jpeg'),
  @('residential-11-source.jpg', 'beb217_b58590995b52438f83afc69df33a3242~mv2.jpg'),
  @('residential-12-source.jpg', 'beb217_9d0574cfde9e412faa8317e23c620588~mv2.jpg'),
  @('residential-13-source.jpg', 'beb217_65470d758c394ee28768debe71871a5d~mv2.jpg'),
  @('residential-14-source.jpg', 'beb217_d83404deaa4c42de85a095365bd7d143~mv2.jpg'),
  @('fnb-01-source.jpg', 'beb217_64f57edb69dd4d4cadbb966cae372fb1~mv2.jpg'),
  @('fnb-02-source.jpeg', 'beb217_c59fea6243d1413a8636a3639bab8d92~mv2.jpeg'),
  @('fnb-03-source.jpeg', 'beb217_99615516ce0442e3b066c6064b23920f~mv2.jpeg'),
  @('fnb-04-source.jpeg', 'beb217_5f3780bdb4234920a842da273afd4475~mv2.jpeg'),
  @('fnb-05-source.jpeg', 'beb217_2e2ef29e6b75443998d930b54bbec834~mv2.jpeg'),
  @('fnb-06-source.jpeg', 'beb217_7e876ee06e114423859629d7d713db17~mv2.jpeg'),
  @('fnb-07-source.jpg', 'beb217_0d49f44e86524b9794e1449a5215f42e~mv2.jpg'),
  @('fnb-08-source.jpeg', 'beb217_84fe8723cf52477784b246eb2d825d15~mv2.jpeg'),
  @('retail-01-source.jpeg', 'beb217_dd6b469abbea4a3383352bda3d38d721~mv2.jpeg'),
  @('retail-02-source.jpeg', 'beb217_f42db95730c648e5a55f287998c1c200~mv2.jpeg'),
  @('retail-03-source.jpeg', 'beb217_7ef59355854248ceaceb975cc72d81cf~mv2.jpeg'),
  @('retail-04-source.jpeg', 'beb217_666f43c6f0df4626b784fa71f7784540~mv2.jpeg'),
  @('retail-05-source.jpg', 'beb217_618bd772edf44b0f87aa425e38af0a04~mv2.jpg'),
  @('retail-06-source.jpg', 'beb217_bdcce1effaeb4a279f2689c39df32b94~mv2.jpg'),
  @('retail-07-source.jpeg', 'beb217_6219702d6d034f5d9f1842d9f2933f8b~mv2.jpeg'),
  @('retail-08-source.jpeg', 'beb217_d0ebcd2778424051bfe37a686c2f7413~mv2.jpeg'),
  @('hospitality-01-source.jpg', 'beb217_192f5e9a05d0432982e5f5efb2ac9231~mv2.jpg'),
  @('hospitality-02-source.jpg', 'beb217_d01245a6fef5461db552930ecab7a606~mv2.jpg')
)

foreach ($asset in $assets) {
  $target = Join-Path $destination $asset[0]
  curl.exe -L --fail --silent --show-error "https://static.wixstatic.com/media/$($asset[1])" -o $target
  Write-Host "Downloaded $($asset[0])"
}
