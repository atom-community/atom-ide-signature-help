# [0.16.0](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.15.4...v0.16.0) (2021-06-09)


### Bug Fixes

* accurate type handling ([522828a](https://github.com/atom-ide-community/atom-ide-signature-help/commit/522828a9ca4bd9c06d84d457eb072aca79dc555a))
* add eslint and run eslint --fix ([b6f64d1](https://github.com/atom-ide-community/atom-ide-signature-help/commit/b6f64d14bd3b4d68153385890df97215db372e75))
* apply the className to the element ([5ae58e6](https://github.com/atom-ide-community/atom-ide-signature-help/commit/5ae58e63d179958b85e039f06e8e2a1ec782f7ad))
* await showSignatureHelp ([ccefc38](https://github.com/atom-ide-community/atom-ide-signature-help/commit/ccefc38d884db0d24d59c9706f5ea70ee599dd94))
* default showSignatureHelpOnTyping to true ([6e97d2f](https://github.com/atom-ide-community/atom-ide-signature-help/commit/6e97d2f46a526c045e494d2b8c8ee0133fa49e89))
* fix package-deps loading ([e3d7741](https://github.com/atom-ide-community/atom-ide-signature-help/commit/e3d7741958e872a34becdf1c0678c18e4e45e4b4))
* make mountSignatureHelp a free function ([a1028a2](https://github.com/atom-ide-community/atom-ide-signature-help/commit/a1028a219c3622876bfb55b820c2223d4289a0f3))
* update dependencies ([5779df8](https://github.com/atom-ide-community/atom-ide-signature-help/commit/5779df85008953094307a360e76ea277702e8484))


### Features

* convert to solid ([0fecdb9](https://github.com/atom-ide-community/atom-ide-signature-help/commit/0fecdb9669e0b46a8ded97ee36def56511ff73fe))

## [0.15.4](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.15.3...v0.15.4) (2021-06-07)


### Bug Fixes

* documentation can be null ([15a5bf4](https://github.com/atom-ide-community/atom-ide-signature-help/commit/15a5bf4e3e2a99ce1ff929a32bdbedd9adddb821))
* keep react outside of the bundle ([4cf07ae](https://github.com/atom-ide-community/atom-ide-signature-help/commit/4cf07aec5eaf0672b1268e6ab5a93448c24c4e3c))
* update dependencies ([0ac8094](https://github.com/atom-ide-community/atom-ide-signature-help/commit/0ac80947e5f9e65dbcab19eaf7b2239b51e180e2))

## [0.15.3](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.15.2...v0.15.3) (2021-02-27)


### Bug Fixes

* fix view.element type ([e3a2459](https://github.com/atom-ide-community/atom-ide-signature-help/commit/e3a2459416b2b11862143906d9ffa6b8ce7472ac))
* use grammarName ([31a49f0](https://github.com/atom-ide-community/atom-ide-signature-help/commit/31a49f02976aa9ab1e50d6f4856003c7168282b3))


### Performance Improvements

* glow only the info bar ([cf7eda5](https://github.com/atom-ide-community/atom-ide-signature-help/commit/cf7eda5ff852d36c6f5e990d3f4acc3721ddb56f))

## [0.15.2](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.15.1...v0.15.2) (2021-02-10)


### Bug Fixes

* fix copying text on MacOS ([fd72cf6](https://github.com/atom-ide-community/atom-ide-signature-help/commit/fd72cf61c113a4c4338d4aaddda5fcd7128d6b43))

## [0.15.1](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.15.0...v0.15.1) (2021-02-06)


### Bug Fixes

* create subs globally ([4ce7eff](https://github.com/atom-ide-community/atom-ide-signature-help/commit/4ce7eff4f9fcb6553316371354e05035f39ec272))
* remove redundant check ([708b1d2](https://github.com/atom-ide-community/atom-ide-signature-help/commit/708b1d25d920016bbbe4e7cd256b04d7560d1d00))
* update atom-package-deps ([56af09d](https://github.com/atom-ide-community/atom-ide-signature-help/commit/56af09dfebfd577e44569bcec4a887b1eac193c4))
* use native copying ([08eff0e](https://github.com/atom-ide-community/atom-ide-signature-help/commit/08eff0e8f2356acfbdb609661e8e3bc7f16adaef))

# [0.15.0](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.14.1...v0.15.0) (2021-02-06)


### Bug Fixes

*  signature.parameters might be undefined ([b889ea8](https://github.com/atom-ide-community/atom-ide-signature-help/commit/b889ea8440bbbb6f0e8b6e802377d92e212a4cf8))
* accept null in updateCurrentEditor ([286a0f1](https://github.com/atom-ide-community/atom-ide-signature-help/commit/286a0f12401576f45432261d3badd1c4a811d495))
* do not null set editorSubscriptions ([2e93f07](https://github.com/atom-ide-community/atom-ide-signature-help/commit/2e93f07cec3b69f82f8e6fbb3e5926553aeb26ce))
* do not null set signatureHelpDisposables ([3ae024d](https://github.com/atom-ide-community/atom-ide-signature-help/commit/3ae024dae1ad68c0292a68e960dfc8a8de58658b))
* do not null set subs ([ff548d8](https://github.com/atom-ide-community/atom-ide-signature-help/commit/ff548d8a97a855b3c4214cef04c69d11ec310a5b))
* handle the signature documentation and parameter documentation better ([761545f](https://github.com/atom-ide-community/atom-ide-signature-help/commit/761545f8de546099dc6c01b184ab2acafe6e18f8))
* move props from constructor to props ([516cf00](https://github.com/atom-ide-community/atom-ide-signature-help/commit/516cf005dfce39dda2d3a7e4ff4b0b8b29f6dbc6))
* remove undefined value ([92d81a3](https://github.com/atom-ide-community/atom-ide-signature-help/commit/92d81a324b542b23c2a612cbcb7c6ce34d94bd41))
* triggerCharacters might be undefined ([8aaabc9](https://github.com/atom-ide-community/atom-ide-signature-help/commit/8aaabc994e3f1ca127c7790b152ab4c8d1913f8a))
* watchEditor might return null ([b5583e2](https://github.com/atom-ide-community/atom-ide-signature-help/commit/b5583e201ff3c1f784c2a3919baa8a90f0ec1b7b))


### Features

* convert main to TypeScript ([e39d52c](https://github.com/atom-ide-community/atom-ide-signature-help/commit/e39d52c045a130729b229ad454679578464a033f))
* convert SignatureHelpManager to TypeScript ([6c18c0b](https://github.com/atom-ide-community/atom-ide-signature-help/commit/6c18c0b0d906f23c1ad568133ef89e50d98b16fc))
* convert to typescript ([e334fc6](https://github.com/atom-ide-community/atom-ide-signature-help/commit/e334fc61d11133d23e96ac33ef1e6dcbac22483a))

## [0.14.1](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.14.0...v0.14.1) (2021-02-03)


### Bug Fixes

* downgrade package-deps ([89c08f9](https://github.com/atom-ide-community/atom-ide-signature-help/commit/89c08f93104ea50d831b6290328af11572cdbb04))

# [0.14.0](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.13.3...v0.14.0) (2021-02-02)


### Bug Fixes

* add bottom border to signature-help ([53ce164](https://github.com/atom-ide-community/atom-ide-signature-help/commit/53ce164106a6d2c8b7226bc706ab5af3249e3930))
* bump atom-ide-base ([14bfebd](https://github.com/atom-ide-community/atom-ide-signature-help/commit/14bfebda0c203cb2f4ef1d829a41d1cd075129ea))
* update package-deps ([4154230](https://github.com/atom-ide-community/atom-ide-signature-help/commit/4154230676dc42bbd7ee180e6b2a05301ddc51a7))


### Features

* make signature-help text selectable and copyable ([ee08755](https://github.com/atom-ide-community/atom-ide-signature-help/commit/ee08755052367ac3586c300e9be63fb841a88ec1))

## [0.13.3](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.13.2...v0.13.3) (2021-01-31)


### Bug Fixes

* use [@font-family](https://github.com/font-family) ([09fb34d](https://github.com/atom-ide-community/atom-ide-signature-help/commit/09fb34d645d18acd36512777d69a9f43b218d1ae))

## [0.13.2](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.13.1...v0.13.2) (2020-12-25)


### Bug Fixes

* transform overlay to make underneath of the signature help clickable ([999d089](https://github.com/atom-ide-community/atom-ide-signature-help/commit/999d089cd10978acf72fcaac6bb4abf276c852c9))

## [0.13.1](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.13.0...v0.13.1) (2020-10-22)


### Bug Fixes

* bump ([4053252](https://github.com/atom-ide-community/atom-ide-signature-help/commit/40532524c2693846c1147e05e911dd9d8344ece7))

# [0.13.0](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.12.0...v0.13.0) (2020-10-12)


### Bug Fixes

* set signature-element style in ViewContainer ([0197128](https://github.com/atom-ide-community/atom-ide-signature-help/commit/0197128fb1f05f54c34ab647cd6b4a601c527e91))
* signature help is shown outside of the screen in the first lines ([953d754](https://github.com/atom-ide-community/atom-ide-signature-help/commit/953d754977d6406286fb45c1e34071cf2049ca05))


### Features

* atom-ide-base 2.1.0 ([d174619](https://github.com/atom-ide-community/atom-ide-signature-help/commit/d174619c07c0eb48b77adb0366e87775e8c442f3))
* code highlighting + proper styling ([99a2451](https://github.com/atom-ide-community/atom-ide-signature-help/commit/99a245125b9310418d18e4c8efb8ab23c3ab36cb))

# [0.12.0](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.11.0...v0.12.0) (2020-10-09)


### Bug Fixes

* atom-ide-base 2.0.1 ([37315ee](https://github.com/atom-ide-community/atom-ide-signature-help/commit/37315eef00f8897727c746786b940b4441c0122f))
* bring glowClass to signature package ([a9b0942](https://github.com/atom-ide-community/atom-ide-signature-help/commit/a9b0942f15d6bdd461f7e0ff9b5e7784901a1730))
* reduce glow brightness ([238aafd](https://github.com/atom-ide-community/atom-ide-signature-help/commit/238aafd08e27db55137acedd7cf7ab2ed75e3f6a))


### Features

* atom-ide-base 2 ([8345a5b](https://github.com/atom-ide-community/atom-ide-signature-help/commit/8345a5baeb0a292401f6441e737dcc94d41adf9a))
* use markdown-service from atom-ide-base ([50fe05f](https://github.com/atom-ide-community/atom-ide-signature-help/commit/50fe05f65d17b0aba14ef4c3a3255cf6570e9ece))
* use self-contained ViewContainer components ([bede650](https://github.com/atom-ide-community/atom-ide-signature-help/commit/bede650dd7b625adb26031a57d69a447e7563e72))

# [0.11.0](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.10.0...v0.11.0) (2020-10-08)


### Bug Fixes

* bump ([540355d](https://github.com/atom-ide-community/atom-ide-signature-help/commit/540355d2f9b05d54e1084d40d2d6f45ed50895ad))


### Features

* atom-ide-base 1.11.2 ([6891f70](https://github.com/atom-ide-community/atom-ide-signature-help/commit/6891f703c40e0a2383c202c4d0c5eaa1a93e60be))

# [0.10.0](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.9.0...v0.10.0) (2020-10-06)


### Bug Fixes

* pass markdown renderer ([99a9e66](https://github.com/atom-ide-community/atom-ide-signature-help/commit/99a9e66df59c3ad752f02d4fcbada94b0c49c64b))
* pass strings as an array ([6f9c01e](https://github.com/atom-ide-community/atom-ide-signature-help/commit/6f9c01e68b743323165b797b28a984ae4bbc41c6))


### Features

* use atom-ide-base 1.8.0 ([c80c04d](https://github.com/atom-ide-community/atom-ide-signature-help/commit/c80c04d785bf5bbd6111b192a6ea951701ded911))
* use getDocumentationHtml and getSnippetHtml from atom-ide-base ([8c5cdd0](https://github.com/atom-ide-community/atom-ide-signature-help/commit/8c5cdd005ed60f237c9be27881653ed3a025827a))
* use ViewContainer from atom-ide-base ([b7cfbfb](https://github.com/atom-ide-community/atom-ide-signature-help/commit/b7cfbfb6f05f24689c90b162e4ffae18f698f587))

# [0.9.0](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.8.0...v0.9.0) (2020-10-05)


### Bug Fixes

* move use babel ([b73bc91](https://github.com/atom-ide-community/atom-ide-signature-help/commit/b73bc9120e7e7aee36f76ddc361185e14a30ede9))


### Features

* bump ([45029c2](https://github.com/atom-ide-community/atom-ide-signature-help/commit/45029c27f227538e3d3b24b04c9daf1c394d16ba))
* install atom-ide-base ([c613375](https://github.com/atom-ide-community/atom-ide-signature-help/commit/c613375fa1d6069d58c51833a8fd8680ab2b8816))
* use ProviderRegistry from atom-ide-base ([f4280cb](https://github.com/atom-ide-community/atom-ide-signature-help/commit/f4280cbc77ce5347c9b310dafccb22d32d779c7f))

# [0.8.0](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.7.2...v0.8.0) (2020-07-23)

### Bug Fixes

- change invalidate to overlap ([325d9a8](https://github.com/atom-ide-community/atom-ide-signature-help/commit/325d9a89091a9f460ef5701d45ae69dc98a49b3b))
- hide info bar ([9a6a893](https://github.com/atom-ide-community/atom-ide-signature-help/commit/9a6a893fa7489ad92419757cca69099731297748))
- signature help config ([6c3cace](https://github.com/atom-ide-community/atom-ide-signature-help/commit/6c3cacec43214615dcc8234722e89c8ec117f08f))
- wrong class for signature ([3d32b99](https://github.com/atom-ide-community/atom-ide-signature-help/commit/3d32b9943a6cf9dd57528b4518abe5714864b28d))

### Features

- add glowOnHover config ([6eab7f6](https://github.com/atom-ide-community/atom-ide-signature-help/commit/6eab7f6f45c8295e6b3935179db82f83f9491b4e))
- fix the signature views (based on datatip view) ([45f7243](https://github.com/atom-ide-community/atom-ide-signature-help/commit/45f7243aa890ac00cd1007fb72efcc74623fd8e5))
- fix the styles (based on datatip styles) ([604f06f](https://github.com/atom-ide-community/atom-ide-signature-help/commit/604f06f6e104b85e29a7a6d3dcba7ef9426e719b))
- separate signature-glow class ([31ef467](https://github.com/atom-ide-community/atom-ide-signature-help/commit/31ef467e37b6245f918bbf5a8ad48827fe44cc2e))

## [0.7.2](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.7.1...v0.7.2) (2020-04-13)

### Bug Fixes

- activation hook to improve the loading time by deferring it ([784a943](https://github.com/atom-ide-community/atom-ide-signature-help/commit/784a943))

## [0.7.1](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.7.0...v0.7.1) (2019-06-29)

### Bug Fixes

- unreliable grammar name source in signature data tip ([8d0f2c8](https://github.com/atom-ide-community/atom-ide-signature-help/commit/8d0f2c8))

# [0.7.0](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.6.4...v0.7.0) (2019-06-24)

### Features

- upgrade build packages ([a0b6a10](https://github.com/atom-ide-community/atom-ide-signature-help/commit/a0b6a10))

## [0.6.4](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.6.3...v0.6.4) (2019-06-19)

### Bug Fixes

- upgrade packages ([ab3c4f2](https://github.com/atom-ide-community/atom-ide-signature-help/commit/ab3c4f2))

## [0.6.3](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.6.2...v0.6.3) (2019-04-25)

### Bug Fixes

- parameter help documentation ([197ef36](https://github.com/atom-ide-community/atom-ide-signature-help/commit/197ef36))

## [0.6.2](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.6.1...v0.6.2) (2019-04-18)

### Bug Fixes

- markdown text positioning ([35633a1](https://github.com/atom-ide-community/atom-ide-signature-help/commit/35633a1))
- markdown text positioning ([1093569](https://github.com/atom-ide-community/atom-ide-signature-help/commit/1093569))

## [0.6.1](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.6.0...v0.6.1) (2019-04-18)

### Bug Fixes

- align parameter help with data tip ([f79cc99](https://github.com/atom-ide-community/atom-ide-signature-help/commit/f79cc99))
- markdown text rendering ([b445749](https://github.com/atom-ide-community/atom-ide-signature-help/commit/b445749))

# [0.6.0](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.5.0...v0.6.0) (2019-04-18)

### Features

- new layout of signature help ([2c93227](https://github.com/atom-ide-community/atom-ide-signature-help/commit/2c93227))
- new signature help view showing parameter information ([f225874](https://github.com/atom-ide-community/atom-ide-signature-help/commit/f225874))
- use new async renderer with default grammar input ([baef926](https://github.com/atom-ide-community/atom-ide-signature-help/commit/baef926))

# [0.5.0](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.4.5...v0.5.0) (2019-04-08)

### Features

- async/await instead of promises ([ca3a7af](https://github.com/atom-ide-community/atom-ide-signature-help/commit/ca3a7af))

## [0.4.5](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.4.4...v0.4.5) (2019-03-21)

### Bug Fixes

- it doesn't like dynamic heights for long markdown descriptions :( ([e5d3091](https://github.com/atom-ide-community/atom-ide-signature-help/commit/e5d3091))

## [0.4.4](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.4.3...v0.4.4) (2019-03-21)

### Bug Fixes

- overlay sizing ([5888563](https://github.com/atom-ide-community/atom-ide-signature-help/commit/5888563))

## [0.4.3](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.4.2...v0.4.3) (2019-03-21)

### Bug Fixes

- error handling in promise, activeParameter capturing ([e9d3ce7](https://github.com/atom-ide-community/atom-ide-signature-help/commit/e9d3ce7))

## [0.4.2](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.4.1...v0.4.2) (2019-03-19)

### Bug Fixes

- calling mount/unmount in a right sequence ([023620b](https://github.com/atom-ide-community/atom-ide-signature-help/commit/023620b))

## [0.4.1](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.4.0...v0.4.1) (2019-03-19)

### Bug Fixes

- upload screenshot to github cdn ([31c8fc3](https://github.com/atom-ide-community/atom-ide-signature-help/commit/31c8fc3))

# [0.4.0](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.3.5...v0.4.0) (2019-03-18)

### Features

- add request token, custom css selector for signature help ([e2f6df4](https://github.com/atom-ide-community/atom-ide-signature-help/commit/e2f6df4))

## [0.3.5](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.3.4...v0.3.5) (2019-03-18)

### Bug Fixes

- remove padding from pre tag ([0c40ef1](https://github.com/atom-ide-community/atom-ide-signature-help/commit/0c40ef1)), closes [#12](https://github.com/atom-ide-community/atom-ide-signature-help/issues/12)

## [0.3.4](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.3.3...v0.3.4) (2019-03-17)

### Bug Fixes

- font-size and pre tag design ([9c57151](https://github.com/atom-ide-community/atom-ide-signature-help/commit/9c57151))

## [0.3.3](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.3.2...v0.3.3) (2019-03-17)

### Bug Fixes

- dependency installation prompt ([b8265e1](https://github.com/atom-ide-community/atom-ide-signature-help/commit/b8265e1))

## [0.3.2](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.3.1...v0.3.2) (2019-03-17)

### Bug Fixes

- null pointer during startup ([a0f0cca](https://github.com/atom-ide-community/atom-ide-signature-help/commit/a0f0cca))

## [0.3.1](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.3.0...v0.3.1) (2019-03-17)

### Bug Fixes

- package dependency installation ([3556efc](https://github.com/atom-ide-community/atom-ide-signature-help/commit/3556efc))

# [0.3.0](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.2.0...v0.3.0) (2019-03-17)

### Features

- adding markdown-renderer service support ([9ea684a](https://github.com/atom-ide-community/atom-ide-signature-help/commit/9ea684a))

# [0.2.0](https://github.com/atom-ide-community/atom-ide-signature-help/compare/v0.1.3...v0.2.0) (2019-03-12)

### Features

- add initial travis-ci integration ([69f604c](https://github.com/atom-ide-community/atom-ide-signature-help/commit/69f604c))

### 0.1.3

- Move to atom-ide-community

### 0.1.1 - Bugfix Release

- position signature help view above current editing line

## 0.1.0 - First Release

- Initial Release on Atom.io
- Properly rendering markdown in overlay
- UI bugfixes for overlay (shadow, sizing)
