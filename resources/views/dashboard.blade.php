<x-app-layout>
    <div id="frame" class="overflow-hidden">
        <x-sidebar :users="$users" />

        <div class="content">
            <div class="blank-wrap">
                <p>select a contact to start messaging</p>
            </div>
            <div class="loader-container d-none">
                <div class="loader"></div>
            </div>
            <x-navbar />
            <x-messages />
            <x-message-input />
        </div>

    </div>
</x-app-layout>
